<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

      /**
     * @OA\Get(
     *    path="/admin/categories",
     *    operationId="index",
     *    tags={"Categories"},
     *    summary="Get list of categories",
     *    description="Get list of categories",
     *    security={{"sanctum":{}}},
     *     @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *             @OA\Property(property="status", type="integer", example="200"),
     *             @OA\Property(property="data",type="object")
     *          )
     *       )
     *  )
     */
    public function index()
    {
        return CategoryResource::collection(Category::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCategoryRequest  $request
     * @return \Illuminate\Http\Response
     */

     /**
     * @OA\Post(
     *      path="/admin/categories",
     *      operationId="store",
     *      tags={"Categories"},
     *      summary="Store category in DB",
     *      description="Store category in DB",
     *      @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *            required={"name", "image"},
     *            @OA\Property(property="name", type="string", format="string", example="Test category Title"),
     *            @OA\Property(property="image", type="text", format="text", example="image"),
     *         ),
     *      ),
     *     @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *             @OA\Property(property="status", type="integer", example=""),
     *             @OA\Property(property="data",type="object")
     *          )
     *       )
     *  )
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();
        if ($image=$request->file('image')) {
            $imageName=$image->getClientOriginalName();
            $image->move('categories/images',$imageName);
            $data['image'] = $imageName;
        }
        $category = Category::create($data);

        return response(new CategoryResource($category) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */

     /**
     * @OA\Get(
     *    path="/admin/categories/{id}",
     *    operationId="show",
     *    tags={"Categories"},
     *    summary="Get Category Detail",
     *    description="Get Category Detail",
     *    @OA\Parameter(name="id", in="path", description="Id of Category", required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *     @OA\Response(
     *          response=200,
     *          description="Success",
     *          @OA\JsonContent(
     *          @OA\Property(property="status_code", type="integer", example="200"),
     *          @OA\Property(property="data",type="object")
     *           ),
     *        )
     *       )
     *  )
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCategoryRequest  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */


      /**
     * @OA\Put(
     *     path="/admin/categories/{id}",
     *     operationId="update",
     *     tags={"Categories"},
     *     summary="Update category in DB",
     *     description="Update category in DB",
     *     @OA\Parameter(name="id", in="path", description="Id of Category", required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *        required=true,
     *        @OA\JsonContent(
     *           required={"name", "image"},
     *           @OA\Property(property="name", type="string", format="string", example="Test Category Name"),
     *           @OA\Property(property="image", type="text", format="string", example="image"),
     *        ),
     *     ),
     *     @OA\Response(
     *          response=200, description="Success",
     *          @OA\JsonContent(
     *             @OA\Property(property="status_code", type="integer", example="200"),
     *             @OA\Property(property="data",type="object")
     *          )
     *       )
     *  )
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $data = $request->validated();
        $data['name']  = $request->name;
        //  $category->name = $request->name;
        if ($image=$request->file('image')) {
            $imageName=$image->getClientOriginalName();
            $image->move('categories/images',$imageName);
            // $category->image = $imageName;
            $data['image'] = $imageName;
        }
        $category->update($data);
        // $category->save();
        return new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */

     /**
     * @OA\Delete(
     *    path="/admin/categories/{id}",
     *    operationId="destroy",
     *    tags={"Categories"},
     *    summary="Delete Category",
     *    description="Delete Category",
     *    @OA\Parameter(name="id", in="path", description="Id of Category", required=true,
     *        @OA\Schema(type="integer")
     *    ),
     *    @OA\Response(
     *         response=200,
     *         description="Success",
     *         @OA\JsonContent(
     *         @OA\Property(property="status_code", type="integer", example="200"),
     *         @OA\Property(property="data",type="object")
     *          ),
     *       )
     *      )
     *  )
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response("", 204);
    }
}
