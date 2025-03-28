<?php

namespace App\Http\Controllers\Sms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Repositories\{ MessageRepository, SenderRepository };

class DashboardController extends Controller
{
    private $messageRepository;
    private $senderRepository;

    public function __construct(MessageRepository $messageRepository, SenderRepository $senderRepository) {
        $this->messageRepository = $messageRepository;
        $this->senderRepository = $senderRepository;
    }

    public function dashboard(Request $request) {

        $count = $this->messageRepository
             ->campaign($request->user()->account->senders->pluck('id'))->get()
             ->map(fn($item) => $item->transactions->count())
             ->sum();

        return Inertia::render('dashboard', [
            'balance' => $request->user()->account->sms,
            'campaign' => $this->messageRepository->campaign($request->user()->account->senders->pluck('id'))->count(),
            'transactions' => $count
        ]);
    }
}
