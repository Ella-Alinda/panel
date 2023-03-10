<?php

namespace Convoy\Http\Requests\Admin\Users;

use Convoy\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules = User::getRules();

        return [
            'name' => $rules['name'],
            'email' => $rules['email'],
            'password' => ['required', Password::defaults()],
            'root_admin' => $rules['root_admin'],
        ];
    }
}
