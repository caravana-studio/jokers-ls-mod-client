import CartridgeConnector from '@cartridge/connector'
import { useEffect, useState } from 'react'
import cartridgeConnector from '../../cartridgeConnector'

export const useUsername = () => {
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    (cartridgeConnector as CartridgeConnector).username()?.then((username) => {
      setUsername(username)
    })
  }, [cartridgeConnector])

  return username
}