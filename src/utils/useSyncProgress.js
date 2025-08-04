import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProgressOnly } from "../store/testSlice";

export const useSyncProgress = ({
  userId,
  courseId,
  auto = true,
  debounceMs = 2000,
}) => {
  const dispatch = useDispatch();

  const {
    completedContent,
    activeModule,
    selectedTopic,
    progressPercentage,
    isCompleted,
  } = useSelector((state) => state.test);

  const timeoutRef = useRef(null);

  const saveProgress = useCallback(() => {
    if (!userId || !courseId) return;
    dispatch(
      saveProgressOnly({
        userId,
        courseId,
        completedContent,
        activeModule,
        selectedTopic,
        progressPercentage,
        isCompleted,
      })
    );
  }, [
    userId,
    courseId,
    completedContent,
    activeModule,
    selectedTopic,
    progressPercentage,
    isCompleted,
    dispatch,
  ]);

  const debounceSave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(saveProgress, debounceMs);
  }, [saveProgress, debounceMs]);

  useEffect(() => {
    if (!auto) return;
    debounceSave();
    return () => clearTimeout(timeoutRef.current);
  }, [completedContent, activeModule, selectedTopic, progressPercentage, isCompleted, debounceSave, auto]);

  return { saveProgress };
};
