import React from 'react'

import style from './SearchSelect.module.scss'

import { ModelsUI } from 'types'

/* START - View SearchSelect additional imports and module code. */
import useDebounce from '../../hooks/useDebounce'

const DROPDOWN_OFFSET = 10
const DROPDOWN_ITEM_HEIGHT = 37

const SearchSelect: React.FC<ModelsUI.ISearchSelectProps> = ({
    title,
    placeholder,
    selectedItem,
    error,
    selectList,
    numberOfLines = 5,
    onChange,
}) => {
    const [inputValue, setInputValue] = React.useState<string>('')
    const [selectItemsList, setSelectItemsList] = React.useState<ModelsUI.ISelectedData[]>(selectList)
    const [isDropdownOpen, setDropdownOpen] = React.useState<boolean>(false)
    const [hoverItemIndex, setHoverItemIndex] = React.useState<number>(0)
    const dropdownRef = React.useRef<HTMLDivElement | null>(null)
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    const debouncedInputValue = useDebounce<string>(inputValue, 200)

    /* START - Tracking side-effects. */
    React.useEffect(() => {
        setInputValue(selectedItem ? selectedItem.value : '')
    }, [selectedItem])

    React.useEffect(() => {
        const updateSelectItemsList: ModelsUI.ISelectedData[] = [...selectList].filter(
            (selectItem: ModelsUI.ISelectedData) =>
                selectItem.value.split('').splice(0, debouncedInputValue.length).join('').toLowerCase() ===
                    debouncedInputValue.toLowerCase() && selectItem,
        )

        setSelectItemsList(updateSelectItemsList)
    }, [debouncedInputValue])

    React.useEffect(() => {
        if (selectedItem) {
            setHoverItemIndex(-1)
        }
    }, [isDropdownOpen])

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    const handleKeyDown = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                if (isDropdownOpen) {
                    dropdownClickHandler(selectList[hoverItemIndex])
                } else {
                    setDropdownOpen(true)
                }
            } else if (event.key === 'ArrowDown' && isDropdownOpen) {
                const newHoverItemIndex = selectList.length === hoverItemIndex + 1 ? 0 : hoverItemIndex + 1
                setHoverItemIndex(newHoverItemIndex)
            } else if (event.key === 'ArrowUp' && isDropdownOpen) {
                const newHoverItemIndex = hoverItemIndex === 0 ? selectList.length - 1 : hoverItemIndex - 1
                setHoverItemIndex(newHoverItemIndex)
            }
        },
        [hoverItemIndex, isDropdownOpen, selectItemsList],
    )

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])
    /* END - Tracking side-effects. */

    const dropdownClickHandler = (value: ModelsUI.ISelectedData) => {
        onChange(value)
        setDropdownOpen(false)

        if (inputRef.current) {
            inputRef.current.blur()
        }
    }

    const inputClickHandler = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        // if the click was made with the mouse
        if (event.detail !== 0) {
            setDropdownOpen(true)
        }
    }

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    return (
        <div className={style.wrapper}>
            <p className={style.title}>{title}</p>
            {inputValue === '' ? <p className={style.placeholder}>{placeholder}</p> : null}
            <input
                ref={inputRef}
                className={error ? `${style.input} ${style.input_error}` : style.input}
                type={'input'}
                value={inputValue}
                onClick={inputClickHandler}
                onChange={(event) => inputChangeHandler(event)}
            />

            {isDropdownOpen ? (
                <div
                    className={style.dropdown}
                    ref={dropdownRef}
                    style={{ maxHeight: numberOfLines * DROPDOWN_ITEM_HEIGHT + DROPDOWN_OFFSET }}
                >
                    {selectItemsList.length > 0 ? (
                        selectItemsList.map(
                            (selectItem: ModelsUI.ISelectedData, index: number): JSX.Element | undefined => {
                                let hoverClassName: string = hoverItemIndex === index ? style.dropdown__item_hover : ''
                                let activeClassName: string =
                                    selectedItem && selectedItem.value === selectItem.value
                                        ? style.dropdown__item_active
                                        : ''

                                return (
                                    <div
                                        className={`${style.dropdown__item} ${hoverClassName} ${activeClassName}`}
                                        key={`InputSelect-Item-${selectItem.id}`}
                                        onClick={() => dropdownClickHandler(selectItem)}
                                        onMouseEnter={() => setHoverItemIndex(index)}
                                    >
                                        {selectItem.value}
                                    </div>
                                )
                            },
                        )
                    ) : (
                        <div className={style.empty}>
                            <div className={style.empty__title}>Город не найден</div>
                        </div>
                    )}
                </div>
            ) : null}
            {error ? <p className={style.error}>{error}</p> : null}
        </div>
    )
}

export default SearchSelect
