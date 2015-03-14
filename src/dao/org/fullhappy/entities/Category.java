/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.entities;

import java.io.Serializable;
import java.math.BigInteger;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
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
@Table(name = "category")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Category.findAll", query = "SELECT c FROM Category c"),
    @NamedQuery(name = "Category.findById", query = "SELECT c FROM Category c WHERE c.id = :id"),
    @NamedQuery(name = "Category.findByParentId", query = "SELECT c FROM Category c WHERE c.parentId = :parentId"),
    @NamedQuery(name = "Category.findByTitle", query = "SELECT c FROM Category c WHERE c.title = :title"),
    @NamedQuery(name = "Category.findByCreatedTime", query = "SELECT c FROM Category c WHERE c.createdTime = :createdTime"),
    @NamedQuery(name = "Category.findByDeletedTime", query = "SELECT c FROM Category c WHERE c.deletedTime = :deletedTime")})
public class Category implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Basic(optional = false)
    @Column(name = "parent_id")
    private Long parentId;
    @Basic(optional = false)
    @Column(name = "title")
    private String title;
    @Basic(optional = false)
    @Column(name = "created_time")
    private long createdTime;
    @Column(name = "deleted_time")
    private BigInteger deletedTime;

    public Category() {
    }

    public Category(Long id) {
        this.id = id;
    }

    public Category(Long id, Long parentId, String title, long createdTime) {
        this.id = id;
        this.parentId = parentId;
        this.title = title;
        this.createdTime = createdTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(long createdTime) {
        this.createdTime = createdTime;
    }

    public BigInteger getDeletedTime() {
        return deletedTime;
    }

    public void setDeletedTime(BigInteger deletedTime) {
        this.deletedTime = deletedTime;
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
        if (!(object instanceof Category)) {
            return false;
        }
        Category other = (Category) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "org.fullhappy.entities.Category[ id=" + id + " ]";
    }
    
    public JSONObject toJSON() throws JSONException {
        JSONObject jSONObject = new JSONObject();
        jSONObject.put("categoryId", id);
        jSONObject.put("parentId", parentId);
        jSONObject.put("title", title);
        return jSONObject;
    }
}
