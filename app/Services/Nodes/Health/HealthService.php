<?php

namespace Convoy\Services\Nodes\Health;

use Carbon\Carbon;
use Convoy\Models\Node;
use Convoy\Services\Nodes\VersionService;
use Exception;

class HealthService
{
    public function __construct(private VersionService $versionService)
    {
    }

    public function handle()
    {
        $nodes = Node::all();

        $results = [];

        foreach ($nodes as $node) {
            try {
                $start = microtime(true);

                $this->versionService->setNode($node)->getDetails();

                $latency = round((microtime(true) - $start) * 1000);

                Node::find($node->id)->update(['latency' => $latency, 'last_pinged' => Carbon::now()]);

                array_push($results, ['name' => $node->name, 'latency_in_ms' => $latency, 'success' => true]);
            } catch (Exception $e) {
                array_push($results, ['name' => $node->name, 'latency_in_ms' => 0, 'success' => false]);
            }
        }

        return $results;
    }
}
