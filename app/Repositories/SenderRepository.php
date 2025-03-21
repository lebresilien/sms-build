<?php

namespace App\Repositories;

use App\Models\Sender;
use App\Repositories\BaseRepository;

class SenderRepository extends BaseRepository
{
    protected $fieldSearchable = [
        'name',
        'slug',
    ];

    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    public function model(): string
    {
        return Sender::class;
    }

}
