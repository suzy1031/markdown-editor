import { useState } from 'react'

// カスタムhooks
// 型定義 => 初期値: string key: string型 value: useStateと同じ型[xx, setxx] = useState()
export const useStateWithStorage = (init: string, key: string):[string, (s:string) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init)

  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue)
    localStorage.setItem(key, nextValue)
  }
  // const [text, setText] = useStateWithStorage('', StorageKey)の形で使える
  return [value, setValueWithStorage]
}