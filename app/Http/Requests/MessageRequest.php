<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'min:3'],
            'sender_id' => ['required', 'string', 'exists:senders,slug'],
            'message' => ['required', 'string', 'min:5'],
            'phones' => ['required', 'array'],
            'phones.*' => ['required', 'regex:/^\d{9}$/']
        ];
    }
}
