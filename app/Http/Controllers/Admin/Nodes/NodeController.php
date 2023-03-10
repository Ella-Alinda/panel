<?php

namespace Convoy\Http\Controllers\Admin\Nodes;

use Convoy\Http\Controllers\ApplicationApiController;
use Convoy\Http\Requests\Admin\Nodes\StoreNodeRequest;
use Convoy\Http\Requests\Admin\Nodes\UpdateNodeRequest;
use Convoy\Models\Filters\FiltersNode;
use Convoy\Models\Node;
use Convoy\Transformers\Admin\NodeTransformer;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class NodeController extends ApplicationApiController
{
    public function index(Request $request)
    {
        $nodes = QueryBuilder::for(Node::query())
            ->with('servers')
            ->withCount(['servers'])
            ->allowedFilters(['name', 'fqdn', AllowedFilter::exact('location_id'), AllowedFilter::custom('*', new FiltersNode)])
            ->paginate(min($request->query('per_page', 50), 100))->appends($request->query());

        return fractal($nodes, new NodeTransformer())->respond();
    }

    public function show(Node $node)
    {
        $node->append(['memory_allocated', 'disk_allocated']);

        $node->loadCount('servers');

        return fractal($node, new NodeTransformer())->respond();
    }

    public function store(StoreNodeRequest $request)
    {
        $node = Node::create($request->validated());

        return fractal($node, new NodeTransformer)->respond();
    }

    public function update(UpdateNodeRequest $request, Node $node)
    {
        $node->update($request->validated());

        return fractal($node, new NodeTransformer)->respond();
    }

    public function destroy(Node $node)
    {
        $node->loadCount('servers');

        if ($node->servers_count > 0) {
            throw new BadRequestHttpException('The node cannot be deleted with servers still associated.');
        }

        $node->delete();

        return $this->returnNoContent();
    }
}
