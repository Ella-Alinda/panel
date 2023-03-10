<?php

namespace Convoy\Transformers\Client;

use Convoy\Models\Backup;
use League\Fractal\TransformerAbstract;

class BackupTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected array $defaultIncludes = [
        //
    ];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected array $availableIncludes = [
        //
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Backup $backup)
    {
        return [
            'uuid' => $backup->uuid,
            'is_successful' => $backup->is_successful,
            'is_locked' => $backup->is_locked,
            'name' => $backup->name,
            'size' => $backup->size,
            'completed_at' => $backup->completed_at,
            'created_at' => $backup->created_at,
        ];
    }
}
