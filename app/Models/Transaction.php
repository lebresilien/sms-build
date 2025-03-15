<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\{belongsTo, HasMany};

class Transaction extends Model
{
    protected $fillable = [
        'campaign_id',
        'phone'
    ];

    protected function casts(): array
    {
        return [
            'campaign_id' => 'integer',
            'phone' => 'string',
        ];
    }

    public function campaign(): belongsTo {
        return $this->belongsTo(Campaign::class);
    }
}
