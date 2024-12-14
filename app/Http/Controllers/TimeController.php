<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTimeRequest;
use App\Http\Requests\UpdateTimeRequest;
use App\Http\Resources\TimeResource;
use App\Models\Time;
use Illuminate\Support\Facades\DB;


class TimeController extends Controller
{
    public function index()
    {
        // return TimeResource::collection(
        //     Time::query()->orderBy('id','desc')->get()
        // );
         // Adiciona a pontuação no resultado
         $times = Time::query()
         ->select('id', 'nome', 'vitorias', 'derrotas', 'empates', 'partidas_jogadas', 
             DB::raw('(vitorias * 3 + empates) AS pontuacao'))
         ->orderBy('pontuacao', 'desc')
         ->get();

     // Retorna os dados como uma coleção de recursos
     return TimeResource::collection($times);
    }

    public function store(StoreTimeRequest $request)
    {
        $data = $request->validated();
        $time = Time::create($data);
        return response(new TimeResource($time),201);
    }

    public function show(Time $time)
    {
        return new TimeResource($time);
    }

    public function update(UpdateTimeRequest $request, Time $time)
    {
        $data = $request->validated();
        $time->update($data);
        return new TimeResource($time);
    }

    public function destroy(Time $time)
    {
        $time->delete();

        return response('',204);
    }
}
