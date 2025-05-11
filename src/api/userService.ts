
import { fetchWithDelay } from "./apiClient";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  language: string;
  isPremium: boolean;
  settings: {
    notifications: {
      newSignals: boolean;
      kolUpdates: boolean;
      marketing: boolean;
    };
  };
}

// Получение профиля пользователя
export async function getUserProfile(userId: string): Promise<UserProfile> {
  try {
    // Имитация ответа API
    const mockUserProfile: UserProfile = {
      id: userId,
      name: "John Doe",
      email: "user@example.com",
      language: "en",
      isPremium: false,
      settings: {
        notifications: {
          newSignals: true,
          kolUpdates: true,
          marketing: false
        }
      }
    };
    
    return await fetchWithDelay(mockUserProfile);
  } catch (error) {
    console.error(`Error fetching user profile for user ${userId}:`, error);
    throw error;
  }
}

// Обновление настроек пользователя
export async function updateUserSettings(
  userId: string, 
  settings: Partial<UserProfile["settings"]>
): Promise<boolean> {
  try {
    // В реальном приложении тут был бы PATCH/PUT запрос
    return await fetchWithDelay(true);
  } catch (error) {
    console.error(`Error updating settings for user ${userId}:`, error);
    throw error;
  }
}

// Обновление языковых настроек пользователя
export async function updateUserLanguage(userId: string, language: string): Promise<boolean> {
  try {
    // В реальном приложении тут был бы PATCH/PUT запрос
    return await fetchWithDelay(true);
  } catch (error) {
    console.error(`Error updating language for user ${userId}:`, error);
    throw error;
  }
}

// Обновление пароля пользователя
export async function updateUserPassword(
  userId: string, 
  currentPassword: string,
  newPassword: string
): Promise<boolean> {
  try {
    // В реальном приложении тут был бы POST запрос
    // с проверкой текущего пароля
    if (currentPassword === "wrong") {
      throw new Error("Current password is incorrect");
    }
    
    return await fetchWithDelay(true);
  } catch (error) {
    console.error(`Error updating password for user ${userId}:`, error);
    throw error;
  }
}

// Обновление пользователя до премиум-статуса
export async function upgradeToPremium(userId: string): Promise<boolean> {
  try {
    // В реальном приложении тут был бы POST запрос
    // для инициирования процесса оплаты
    return await fetchWithDelay(true);
  } catch (error) {
    console.error(`Error upgrading user ${userId} to premium:`, error);
    throw error;
  }
}
