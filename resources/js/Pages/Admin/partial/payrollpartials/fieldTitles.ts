export const fieldTitles = [
    {
        title: "Deductions",
        fields: [
        { label: "Absences w/o pay", id: "absent" },
        { label: "W/holding Tax", id: "holding_tax" },
        { label: "Tax Bal Due", id: "tax_bal_due" },
        { label: "Late/Undertime", id: "late" },
        ],
    },
    {
        title: "GSIS",
        fields: [
        { label: "RLIP", id: "rlip", disabled: true },
        { label: "Policy Loan", id: "policy_loan" },
        { label: "Consol Loan", id: "consol_loan" },
        { label: "Emergency Loan", id: "emerg_loan" },
        { label: "GEL", id: "gel" },
        { label: "GFAL", id: "gfal" },
        { label: "MPL", id: "mpl" },
        { label: "MPL LITE", id: "mpl_lite" },
        ],
    },
    {
        title: "HDMF",
        fields: [
        { label: "Contributions", id: "contributions" },
        { label: "Loans", id: "loans" },
        { label: "Housing Loans", id: "housing_loan" },
        ],
    },
    {
        title: "OTHER DEDUCTIONS",
        fields: [
        { label: "Philhealth", id: "philhealth", disabled: true },
        { label: "SSS" , id: "sss"},
        { label: "CFI", id: "cfi" },
        { label: "TIPID", id: "tipid" },
        { label: "CITY BANK SAVINGS", id: "city_savings_bank" },
        { label: "FEA", id: "fea" },
        { label: "CANTEEN", id: "canteen" },
        { label: "Disallowance", id: "disallowance" },
        { label: "Unliquidated Cash Advances", id: "unliquidated_ca" },
        { label: "Disallowance(Honoraria)", id: "disallowance_honoraria" },
        { label: "COOP", id: "coop" },
        { label: "LANDBANK", id: "landbank" },
        { label: "UCPB", id: "ucpb" },
        { label: "Deduction 1", id: "deduction1" },
        { label: "Deduction 2", id: "deduction2" },
        { label: "Deduction 3", id: "deduction3" },
        
        ],
    },
    ];

export const validFieldIds = [
"pera",
"daily_rate",
"hourly_rate",
...fieldTitles.flatMap((s) => s.fields.map((f) => f.id)),
];