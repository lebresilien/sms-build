<?php

namespace App\Http\Controllers\Sms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\CreditRequest;
use Inertia\Inertia;
use Inertia\Response;
use App\Repositories\{ CreditRepository, AccountRepository };
use Illuminate\Support\Facades\Notification;
use App\Notifications\CreditNotification;

class CreditController extends Controller
{
    private $creditRepository;
    private $accountRepository;

    public function __construct(CreditRepository $creditRepository, AccountRepository $accountRepository) {
        $this->creditRepository = $creditRepository;
        $this->accountRepository = $accountRepository;
    }

    public function index(Request $request): Response
    {
        return Inertia::render('credits/index');
    }

    public function store(CreditRequest $request) {

        session()->forget('success');

        $this->creditRepository->create([
            'account_id' => $request->user()->account->id,
            'sms_asked' => $request->sms_asked,
            'sms_delivered' => 0,
            'type' => 'request'
        ]);

        $account = $this->accountRepository->find($request->user()->account->id);

        $data = [
            'account' => $account->id,
            'user_name' => $account->user->name,
            'sms' => $request->sms_asked
        ];

        Notification::route('mail', $account->user->email)->notify(new CreditNotification($data));

        return to_route('credits.index')->with('success', 'Opération réussie !');
    }
}
