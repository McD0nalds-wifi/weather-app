import * as Enums from './enums'

import * as ModelsRedux from '../redux/models'

export interface IButtonProps {
    children: React.ReactNode
    type: Enums.ButtonType
    size: Enums.ButtonSizeType
    icon?: Enums.IconType
    isDisabled?: boolean
    isLoading?: boolean
    onClick: () => void
}

export interface ITitleProps {
    children: React.ReactNode
    size: Enums.TitleSizeType
}

export interface ITextProps {
    children: React.ReactNode
    size: string
    color: Enums.TextColorType
    weight?: Enums.TextWeightType
    align?: Enums.TextAlignType
}

export interface IInputProps {
    type: Enums.InputType
    title: string
    placeholder: string
    value: string
    error: string | null
    onChange: (value: string) => void
    onBlur?: (value: string) => void
}

export interface IInputSelectProps {
    title: string
    placeholder: string
    value: string | null
    error: string | null
    inputSelectList: string[] // todo
    selectedItem: string | null
    emptyErrorTitle: string
    isLoading?: boolean
    onChange: (value: string) => void
    onDropdownChange: (value: string) => void
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IIconProps {
    type: Enums.IconType
    onClick?: () => void
}

export interface IModalProps {
    isOpen: boolean
    title: string
    isOverlayBlocked?: boolean
    onClose: () => void
}

export interface ITabPaneProps {
    children: React.ReactNode
    tab: string
}

export interface ITabContextProps {
    activeTab: string
}

export interface ICurrentTab {
    id: string
    tab: string
    offsetLeft: number
    offsetWidth: number
}

export interface ITabsProps {
    // children: React.ReactElement<ITabPaneProps, string | React.JSXElementConstructor<ITabPaneProps>>[]
    children: JSX.Element | JSX.Element[]
    // | React.ReactElement<ITabPaneProps, string | React.JSXElementConstructor<ITabPaneProps>>
    // | React.ReactElement<ITabPaneProps, string | React.JSXElementConstructor<ITabPaneProps>>[]
    defaultActiveKey: string
}

export interface ITabs {
    (props: ITabsProps): JSX.Element
    TabPane: React.FC<ITabPaneProps>
}

export interface ITabChildren {
    id: string
    tab: string
}

export interface ISummaryCardProps {
    color: Enums.SummaryCardColorType
    title: string
    value: string
    icon: Enums.IconType
}
