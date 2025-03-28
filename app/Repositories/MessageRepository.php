<?php

namespace App\Repositories;

use App\Models\Campaign;
use App\Repositories\BaseRepository;

class MessageRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'title',
        'sender_id',
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return Campaign::class;
    }

    public function campaign($senders_id) {
        return Campaign::whereIn('sender_id', $senders_id);
    }

}
