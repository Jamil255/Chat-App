import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback()
        else toast.error(error?.data?.message || 'Something went wrong')
      }
    })
  }, [errors])
}

const useAsyncMutation = (mutatationHook) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [mutate] = mutatationHook()
  const executeMutation = async (toastMessage, ...args) => {
    const toastId = toast.loading(toastMessage || 'updating data...')
    try {
      setIsLoading(true)
      const res = await mutate(...args)
      if (res.data) {
        toast.success(res.data?.message || 'updating data successfully', {
          id: toastId,
        })
        setData(res?.data)
      } else {
        console.log(res)
        toast.error(res?.error?.data?.message || 'Sometime went worng', {
          id: toastId,
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Sometime went worng', {
        id: toastId,
      })
    } finally {
      setIsLoading(false)
    }
  }
  return [executeMutation, data, isLoading]
}
const useSocketEvents = (socket, handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([events, handler]) => {
      socket.on(events, handler)
    })
    return () => {
      Object.entries(handlers).forEach(([events, handler]) => {
        socket.off(events, handler)
      })
    }
  }, [])
}
export { useErrors, useAsyncMutation,useSocketEvents }
