/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.entities;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author AAAA
 */
@Entity
@Table(name = "item")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Item.findAll", query = "SELECT i FROM Item i"),
    @NamedQuery(name = "Item.findById", query = "SELECT i FROM Item i WHERE i.id = :id"),
    @NamedQuery(name = "Item.findByDisplayId", query = "SELECT i FROM Item i WHERE i.displayId = :displayId"),
    @NamedQuery(name = "Item.findByCategoryId", query = "SELECT i FROM Item i WHERE i.categoryId = :categoryId"),
    @NamedQuery(name = "Item.findByTitle", query = "SELECT i FROM Item i WHERE i.title = :title"),
    @NamedQuery(name = "Item.findByPrice", query = "SELECT i FROM Item i WHERE i.price = :price"),
    @NamedQuery(name = "Item.findByInNew", query = "SELECT i FROM Item i WHERE i.inNew = :inNew"),
    @NamedQuery(name = "Item.findByInPromotion", query = "SELECT i FROM Item i WHERE i.inPromotion = :inPromotion"),
    @NamedQuery(name = "Item.findByNumber", query = "SELECT i FROM Item i WHERE i.number = :number"),
    @NamedQuery(name = "Item.findByCreatedTime", query = "SELECT i FROM Item i WHERE i.createdTime = :createdTime"),
    @NamedQuery(name = "Item.findByDeletedTime", query = "SELECT i FROM Item i WHERE i.deletedTime = :deletedTime")})
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Column(name = "display_id")
    private String displayId;
    @Basic(optional = false)
    @Column(name = "category_id")
    private long categoryId;
    @Basic(optional = false)
    @Column(name = "title")
    private String title;
    @Basic(optional = false)
    @Column(name = "price")
    private int price;
    @Basic(optional = false)
    @Lob
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @Column(name = "avatars")
    private String avatars;
    @Basic(optional = false)
    @Column(name = "in_new")
    private boolean inNew;
    @Basic(optional = false)
    @Column(name = "in_promotion")
    private String inPromotion;
    @Basic(optional = false)
    @Column(name = "number")
    private short number;
    @Basic(optional = false)
    @Column(name = "created_time")
    private long createdTime;
    @Basic(optional = false)
    @Column(name = "deleted_time")
    private long deletedTime;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id")
    List<Color> colors;

    public Item() {
    }

    public Item(Long id) {
        this.id = id;
    }

    public Item(Long id, long categoryId, String title, int price, String description, boolean inNew, String inPromotion, short number, long createdTime, long deletedTime) {
        this.id = id;
        this.categoryId = categoryId;
        this.title = title;
        this.price = price;
        this.description = description;
        this.inNew = inNew;
        this.inPromotion = inPromotion;
        this.number = number;
        this.createdTime = createdTime;
        this.deletedTime = deletedTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDisplayId() {
        return displayId;
    }

    public void setDisplayId(String displayId) {
        this.displayId = displayId;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAvatars() {
        return avatars;
    }

    public void setAvatars(String avatars) {
        this.avatars = avatars;
    }

    public boolean getInNew() {
        return inNew;
    }

    public void setInNew(boolean inNew) {
        this.inNew = inNew;
    }

    public String getInPromotion() {
        return inPromotion;
    }

    public void setInPromotion(String inPromotion) {
        this.inPromotion = inPromotion;
    }

    public short getNumber() {
        return number;
    }

    public void setNumber(short number) {
        this.number = number;
    }

    public long getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(long createdTime) {
        this.createdTime = createdTime;
    }

    public long getDeletedTime() {
        return deletedTime;
    }

    public void setDeletedTime(long deletedTime) {
        this.deletedTime = deletedTime;
    }

    public List<Color> getColors() {
        return colors;
    }

    public void setColors(List<Color> colors) {
        this.colors = colors;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Item)) {
            return false;
        }
        Item other = (Item) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.fullhappy.entities.Item[ id=" + id + " ]";
    }

    public JSONObject toShortInfoJSON() throws JSONException {
        JSONObject jSONObject = new JSONObject();
        jSONObject.put("itemId", this.id);
//        jSONObject.put("displayId", this.displayId);
        jSONObject.put("title", this.title);
        jSONObject.put("categoryId", this.categoryId);
        jSONObject.put("price", this.price);
        jSONObject.put("images", this.avatars);
        jSONObject.put("inNew", this.inNew);
        jSONObject.put("inPromotion", this.inPromotion);
        return jSONObject;
    }

    public JSONObject toJSON() throws JSONException {
        JSONObject jSONObject = new JSONObject();
        jSONObject.put("itemId", this.id);
        jSONObject.put("displayId", this.displayId);
        jSONObject.put("title", this.title);
        jSONObject.put("categoryId", this.categoryId);

        jSONObject.put("description", this.description);
        jSONObject.put("inNew", this.inNew);
        jSONObject.put("inPromotion", this.inPromotion);
        jSONObject.put("price", this.price);
        
        JSONArray jcolor = new JSONArray();
        for(Color c: colors){
            jcolor.put(c.toJSON());
        }
        jSONObject.put("colors", jcolor);
        return jSONObject;
    }

}
