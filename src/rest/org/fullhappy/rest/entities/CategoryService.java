/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.rest.entities;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.fullhappy.dao.CategoryJpaController;
import org.fullhappy.dao.exceptions.NonexistentEntityException;
import org.fullhappy.entities.Category;
import org.fullhappy.rest.MediaType;
import org.fullhappy.rest.annotation.FormParam;
import org.fullhappy.rest.annotation.GET;
import org.fullhappy.rest.annotation.POST;
import org.fullhappy.rest.annotation.Path;
import org.fullhappy.rest.annotation.Produces;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author AAAA
 */
@Path("/category")
public class CategoryService {

    private final CategoryJpaController categoryJpaController = new CategoryJpaController();
    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    public String create(@FormParam("parent_id") Integer parentId,
            @FormParam("title")String title){
        String re;
        if(parentId == null || title == null){
            re  = "{key:404,message:'parentId' and title are required}";
        }else{
            try {
                Category category = new Category();
                categoryJpaController.create(category);
                re ="{key:200,message:''}";
            } catch (Exception ex) {
                Logger.getLogger(CategoryService.class.getName()).log(Level.SEVERE, null, ex);
                 re  = "{error:''}";
            }
        }
        
        return re;
       
    }

     @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
     public String list() throws JSONException{
         
         JSONArray jSONArrayParent = new JSONArray();
         List<Category> parentCategorys = categoryJpaController.findCategoryByParentId(0L);
         if(parentCategorys !=null && !parentCategorys.isEmpty()){
             for (Category parentCategory : parentCategorys) {
                 JSONObject jSONObject = parentCategory.toJSON();
                 List<Category> childCategorys = categoryJpaController.findCategoryByParentId(parentCategory.getId());
                 
                 JSONArray jSONArrayChild = new JSONArray();
                 if(childCategorys!=null && !childCategorys.isEmpty()){                     
                     for (Category childCategory : childCategorys) {
                         JSONObject json = childCategory.toJSON();
                         jSONArrayChild.put(json);
                     }
                 }
                 jSONObject.put("childs", jSONArrayChild);
                 jSONArrayParent.put(jSONObject);
             }
             
         }
         return jSONArrayParent.toString();
     }
//    public void edit(Category category) throws NonexistentEntityException, Exception {
//       
//    }
//
//    public void destroy(Long id) throws NonexistentEntityException {
//       
//    }
//
//    public List<Category> findCategoryEntities() {
//       
//    }
//
//    public List<Category> findCategoryEntities(int maxResults, int firstResult) {
//        
//    }
//
//    private List<Category> findCategoryEntities(boolean all, int maxResults, int firstResult) {
//       
//    }
//
//    public Category findCategory(Long id) {
//       
//    }
//
//    public int getCategoryCount() {
//       
//    }
    
}
