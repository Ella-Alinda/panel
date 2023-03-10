import MultiSelect from '@/components/elements/inputs/MultiSelect'
import { useField } from 'formik'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useAddressesSWR from '@/api/admin/nodes/addresses/useAddressesSWR'
import { NodeContext } from '@/state/admin/node'
import { debounce } from 'debounce'
import MultiSelectFormik from '@/components/elements/forms/MultiSelectFormik'

interface Props {
    disabled?: boolean
    nodeId?: number
}

const AddressesMultiSelectFormik = ({ disabled, nodeId: propNodeId }: Props) => {
    const [{ value: addressIds }] = useField('addressIds')
    const [{ value: formNodeId }] = useField('nodeId')
    const nodeId = propNodeId ?? formNodeId

    const [query, setQuery] = useState('')
    const { data, mutate, isValidating, isLoading } = useAddressesSWR(nodeId ?? -1, { query, serverId: null })
    const { data: selectedAddresses } = useAddressesSWR(nodeId ?? -1, {
        query: ((addressIds as number[]).length > 0 ? (addressIds as number[]) : [-1]).join(','),
        id: 'selected-addresses',
    })

    const addresses = useMemo(() => {
        const available =
            data && selectedAddresses
                ? data.items
                      .filter(address => {
                          return !selectedAddresses.items.find(selectedAddress => selectedAddress.id === address.id)
                      })
                      .map(address => ({
                          value: address.id.toString(),
                          label: address.address,
                      }))
                : []

        const selected = selectedAddresses
            ? selectedAddresses.items.map(address => ({
                  value: address.id.toString(),
                  label: address.address,
              }))
            : []

        return [...selected, ...available]
    }, [data, selectedAddresses])

    const search = useCallback(
        debounce(() => {
            mutate()
        }, 500),
        []
    )

    const handleOnSearch = (query: string) => {
        setQuery(query)
        search()
    }

    return (
        <MultiSelectFormik
            data={addresses}
            searchable
            searchValue={query}
            onSearchChange={handleOnSearch}
            loading={isValidating || isLoading}
            label={'Addresses'}
            nothingFound='No addresses found'
            name={'addressIds'}
            disabled={disabled}
        />
    )
}

export default AddressesMultiSelectFormik
