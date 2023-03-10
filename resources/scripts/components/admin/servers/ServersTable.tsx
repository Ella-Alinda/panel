import useServersSWR from '@/api/admin/servers/useServersSWR'
import { Server } from '@/api/server/getServer'
import Table, { ColumnArray } from '@/components/elements/displays/Table'
import Pagination from '@/components/elements/Pagination'
import Spinner from '@/components/elements/Spinner'
import usePagination from '@/util/usePagination'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Button from '@/components/elements/Button'

interface Props {
    query?: string
    className?: string
    nodeId?: number
    userId?: number
}

const columns: ColumnArray<Server> = [
    {
        accessor: 'name',
        header: 'Name',
        cell: ({ value, row }) => (
            <Link to={`/admin/servers/${row.id}`} className='link text-foreground'>
                {value}
            </Link>
        ),
    },
    {
        accessor: 'hostname',
        header: 'Hostname',
    },
    {
        accessor: 'user',
        header: 'Owner',
        cell: ({ value }) => (
            <Link to={`/admin/users/${value!.id}/settings`} className='link text-foreground'>
                {value!.email}
            </Link>
        ),
    },
    {
        accessor: 'node',
        header: 'Node',
        cell: ({ value }) => value!.name,
    },
]

const ServersTable = ({query, className, nodeId, userId }: Props) => {
    const [page, setPage] = usePagination()
    const { data } = useServersSWR({ page, query, nodeId, userId, includes: ['node', 'user'] })

    return (
        <div className={className}>
            {!data ? (
                <Spinner />
            ) : (
                <Pagination data={data} onPageSelect={setPage}>
                    {({ items }) => <Table columns={columns} data={items} />}
                </Pagination>
            )}
        </div>
    )
}

export default ServersTable
