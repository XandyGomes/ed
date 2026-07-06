"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Frame, FrameSequence } from "@/lib/types";

const BASE_FRAME_DURATION_MS = 1100;

export function useVisualizer<TState>(frames: FrameSequence<TState>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isAtStart = currentIndex <= 0;
  const isAtEnd = currentIndex >= frames.length - 1;

  useEffect(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
  }, [frames]);

  useEffect(() => {
    if (!isPlaying) return;
    if (isAtEnd) {
      setIsPlaying(false);
      return;
    }
    intervalRef.current = setTimeout(() => {
      setCurrentIndex((i) => Math.min(i + 1, frames.length - 1));
    }, BASE_FRAME_DURATION_MS / speed);
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [isPlaying, currentIndex, speed, isAtEnd, frames.length]);

  const play = useCallback(() => {
    if (frames.length === 0) return;
    if (isAtEnd) setCurrentIndex(0);
    setIsPlaying(true);
  }, [isAtEnd, frames.length]);

  const pause = useCallback(() => setIsPlaying(false), []);

  const stepForward = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex((i) => Math.min(i + 1, frames.length - 1));
  }, [frames.length]);

  const stepBack = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
  }, []);

  const seek = useCallback(
    (index: number) => {
      setIsPlaying(false);
      setCurrentIndex(Math.max(0, Math.min(index, frames.length - 1)));
    },
    [frames.length]
  );

  const currentFrame: Frame<TState> | undefined = frames[currentIndex];

  return useMemo(
    () => ({
      currentFrame,
      currentIndex,
      totalFrames: frames.length,
      isPlaying,
      isAtStart,
      isAtEnd,
      speed,
      setSpeed,
      play,
      pause,
      stepForward,
      stepBack,
      reset,
      seek,
    }),
    [
      currentFrame,
      currentIndex,
      frames.length,
      isPlaying,
      isAtStart,
      isAtEnd,
      speed,
      play,
      pause,
      stepForward,
      stepBack,
      reset,
      seek,
    ]
  );
}

export type UseVisualizerReturn<TState> = ReturnType<typeof useVisualizer<TState>>;
