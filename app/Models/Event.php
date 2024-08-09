<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function setDateAttribute($value)
    {
        $this->attributes['date'] =  Carbon::parse($value);
    }

    function gifts()
    {
        return $this->hasMany(Gift::class, "event_id", "id");
    }
}
