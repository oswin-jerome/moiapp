<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gift extends Model
{
    use HasFactory;

    protected $guarded = [];

    function event()
    {

        return $this->belongsTo(Event::class, "id", "event_id");
    }
}
