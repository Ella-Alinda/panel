import { AddressParameters } from '@/api/admin/nodes/addresses/createAddress'
import { Address, rawDataToAddressObject } from '@/api/server/getServer'
import http from '@/api/http'

const updateAddress = async (nodeId: number, addressId: number, payload: AddressParameters): Promise<Address> => {
    const { data: { data } } = await http.put(`/api/admin/nodes/${nodeId}/addresses/${addressId}`, {
        server_id: payload.serverId,
        address: payload.address,
        cidr: payload.cidr,
        gateway: payload.gateway,
        mac_address: payload.macAddress,
        type: payload.type,
    })

    return rawDataToAddressObject(data)
}

export default updateAddress