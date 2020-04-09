<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customers';
    protected $fillable = ['firstname', 'lastname', 'age', 'email', 'phonenumber'];
}
