<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Auth::user()->events()->orderBy("date", "DESC")->withCount("gifts")->get();
        return Inertia::render('Dashboard', [
            "events" => $events
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Events/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        Auth::user()->events()->create($request->validated());

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {


        return Inertia::render("Events/Show", [
            "event" => $event,
            "gifts_count" => $event->gifts()->count(),
            "gifts_sum" => $event->gifts()->sum("amount")
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        //
    }

    /**
     * Generates report.
     */
    public function report(Event $event)
    {
        return Inertia::render("Events/Report", [
            "event" => $event
        ]);
    }
    /**
     * Generates PDF.
     */
    public function reportPdf(Event $event, Request $request)
    {
        $gifts = $event->gifts();
        if ($request->has("gifted_to") && $request->get("gifted_to") != "") {
            $gifts = $gifts->where("gifted_to", $request->get("gifted_to"));
        }

        $pdf =
            $pdf = Pdf::loadView('pdf.report', [
                "event" => $event,
                "gifts" => $gifts->get(),
                "total" => $gifts->sum("amount"),
                "gifted_to" => $request->has("gifted_to") && $request->get("gifted_to") != "" ? $request->get("gifted_to") : "All"
            ]);
        return $pdf->stream();
    }
}
