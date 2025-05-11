
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Хук для удобной работы с API
 * @param initialState начальное состояние данных
 */
export function useApi<T>(initialState: T | null = null) {
  const { t, language } = useLanguage();
  const [state, setState] = useState<ApiState<T>>({
    data: initialState,
    loading: false,
    error: null
  });

  /**
   * Выполняет API-запрос и управляет состоянием загрузки/ошибок
   * @param apiCall функция, выполняющая API-запрос
   * @param errorMessage сообщение об ошибке для отображения
   * @param successMessage сообщение об успехе для отображения
   */
  const callApi = useCallback(
    async (
      apiCall: () => Promise<T>,
      errorMessage?: string,
      successMessage?: string
    ) => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const data = await apiCall();
        setState({ data, loading: false, error: null });
        
        if (successMessage) {
          toast.success(successMessage);
        }
        
        return { success: true, data };
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error('Unknown error');
        setState({ data: null, loading: false, error: errorObj });
        
        const defaultErrorMsg = language === 'en' ? 'An error occurred' : 'Произошла ошибка';
        toast.error(errorMessage || defaultErrorMsg);
        
        return { success: false, error: errorObj };
      }
    },
    [language]
  );

  return {
    ...state,
    callApi,
    setData: (data: T) => setState(prev => ({ ...prev, data })),
    reset: () => setState({ data: initialState, loading: false, error: null })
  };
}

export default useApi;
