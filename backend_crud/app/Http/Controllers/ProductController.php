<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return  Product::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'fishing_name' => 'required',
            'type' => 'required',
            'price' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $product = new Product;
        if ($request->hasfile('image')) {
            $fileImage = $request->file('image');
            $extension = $fileImage->getClientOriginalExtension();
            $imageName = time(). '.' .$extension;
            $imagePath = $fileImage->storeAs('',$imageName, 'public');

            $product->fishing_name = $request->input('fishing_name');
            $product->type = $request->input('type');
            $product->price = $request->input('price');
            $product->image = $imageName;
            $product->save();
            return $product;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Product::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'fishing_name' => 'required',
            'type' => 'required',
            'price' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        $product = Product::findOrFail($id);

        if ($request->hasfile('image')) {
            $old_imageName = $product->image;
            Storage::delete($old_imageName);

            $fileImage = $request->file('image');
            $extension = $fileImage->getClientOriginalExtension();
            $imageName = time(). '.' .$extension;
            $imagePath = $fileImage->storeAs('',$imageName, 'public');

            $product->fishing_name = $request->input('fishing_name');
            $product->type = $request->input('type');
            $product->price = $request->input('price');
            $product->image = $imageName;

            $product->save();
            return $product;
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $imageName = $product->image;
        Storage::delete($imageName);
        $product->destroy($id);
        return 'delete suscessfully';
    }
}
