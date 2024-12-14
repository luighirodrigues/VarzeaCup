<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePartidaRequest;
use App\Http\Requests\UpdatePartidaRequest;
use App\Http\Resources\PartidaResource;
use App\Models\Partida;
use Illuminate\Http\Request;

class PartidaController extends Controller
{
    public function index()
    {
        return PartidaResource::collection(
            Partida::query()->orderBy('id','desc')->get()
        );
    }

    public function store(StorePartidaRequest $request)
    {
        $data = $request->validated();
        $partida = Partida::create($data);
        return response(new PartidaResource($partida),201);
    }

    public function show(Partida $partida)
    {
        return new PartidaResource($partida);
    }

    public function update(UpdatePartidaRequest $request, Partida $partida)
    {
        $data = $request->validated();
        $partida->update($data);
        return new PartidaResource($partida);
    }

    public function destroy(Partida $partida)
    {
        $partida->delete();

        return response('',204);
    }
}

