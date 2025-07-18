<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditPublishRequest extends FormRequest
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
        $monetaryRule = ['sometimes', 'nullable', 'numeric', 'regex:/^\d+(\.\d{1,2})?$/'];

        return [
            'user_id' => ['required', 'exists:users,user_id'],
            'pera' => $monetaryRule,
            'absent' => $monetaryRule,
            'late' => $monetaryRule,
            'holding_tax' => $monetaryRule,
            'tax_bal_due' => $monetaryRule,
            'policy_loan' => $monetaryRule,
            'consol_loan' => $monetaryRule,
            'emerg_loan' => $monetaryRule,
            'gel' => $monetaryRule,
            'gfal' => $monetaryRule,
            'mpl' => $monetaryRule,
            'mpl_lite' => $monetaryRule,
            'contributions' => $monetaryRule,
            'loans' => $monetaryRule,
            'housing_loan' => $monetaryRule,
            'cfi' => $monetaryRule,
            'tipid' => $monetaryRule,
            'city_savings_bank' => $monetaryRule,
            'fea' => $monetaryRule,
            'canteen' => $monetaryRule,
            'disallowance' => $monetaryRule,
            'unliquidated_ca' => $monetaryRule,
            'disallowance_honoraria' => $monetaryRule,
            'coop' => $monetaryRule,
            'landbank' => $monetaryRule,
            'ucpb' => $monetaryRule,
        ];
    }
}
