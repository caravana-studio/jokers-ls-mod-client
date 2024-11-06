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

export const useControllerAddress = () => {
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    (cartridgeConnector as CartridgeConnector).account()?.then((acc) => {
      setAddress(acc.address)
    })
  }, [cartridgeConnector])

  return address
}