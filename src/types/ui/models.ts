import * as Enums from './enums'

import * as ModelsRedux from '../redux/models'
export interface IModalProps {
    isOpen: boolean
    title: string
    isOverlayBlocked?: boolean
    onClose: () => void
}

export interface ISelectedData {
    value: string
    id: number
}

export interface ISearchSelectProps {
    title: string
    placeholder: string
    selectedItem: ISelectedData | null
    error: string | null
    selectList: ISelectedData[]
    numberOfLines?: number
    onChange: (value: ISelectedData) => void
}

export interface ICardProps {
    city: string
    localtime: string
    temperature: number
    condition: string
    icon: string
    isLoading: boolean
}
