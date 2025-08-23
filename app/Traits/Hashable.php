<?php

namespace App\Traits;

use Vinkla\Hashids\Facades\Hashids;

trait Hashable
{
    protected function decodeHash(?string $hash): ?int
    {
        
        if (!$hash) {
            return null;
        }
        
        try {
            $decoded = Hashids::decode($hash);
            return $decoded[0] ?? null;
        } catch (\Exception $e) {
            return null;
        }
    }

    protected function encodeHash(int $id): string
    {
        try {
            return Hashids::encode($id);
        } catch (\Exception $e) {
            return (string) $id;
        }
    }
}