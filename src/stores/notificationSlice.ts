import { StateCreator } from "zustand"
import { FavoriteSliceType } from "./favoriteSlice"

// Define el tipo para una notificación
type Notification = {
    text: string
    error: boolean
    show: boolean
}

// Define el tipo de estado para el slice de notificaciones
export type NotificationSliceType = {
    notification: Notification
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
    hideNotification: () => void
}

// Crea el slice de Notificaciones usando Zustand
export const createNotificationSlice: StateCreator<
    NotificationSliceType & FavoriteSliceType, 
    [], 
    [], 
    NotificationSliceType
> = (set, get) => ({
        notification: {
            text: '',
            error: true,
            show: false
        },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            get().hideNotification()
        }, 5000)
    },
    hideNotification: () => {
        set({
            notification: {
                text: '',
                error: false,
                show: false
            }
        })
    }
})
