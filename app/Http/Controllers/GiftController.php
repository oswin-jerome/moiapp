<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGiftRequest;
use App\Http\Requests\UpdateGiftRequest;
use App\Models\Event;
use App\Models\Gift;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GiftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Event $event, Request $request)
    {
        $gifts = $event->gifts();

        if ($request->has("gifted_to") && $request->get("gifted_to") != "") {
            $gifts = $gifts->where("gifted_to", $request->get("gifted_to"));
        }
        return Inertia::render("Events/Gifts", [
            "event" => $event,
            "gifts_count" => $gifts->count(),
            "gifts_sum" => $gifts->sum("amount"),
            "gifts" => $gifts->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Event $event, StoreGiftRequest $request)
    {
        $gift = $event->gifts()->create($request->validated());

        return redirect()->route("gifts.show", [$event, $gift]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event, Gift $gift)
    {
        return Inertia::render("Events/GiftPdf", [
            "gift" => $gift,
            "event" => $event
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gift $gift)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGiftRequest $request, Gift $gift)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gift $gift)
    {
        //
    }

    public function pdf(Event $event, Gift $gift, Request $request)
    {

        $pdf =
            $pdf = Pdf::loadView('pdf.recipt', [
                "event" => $event,
                "gift" => $gift
            ]);
        return $pdf->stream();
    }
}
