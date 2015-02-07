/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author AAAA
 */
@Entity
@Table(name = "item")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Item.findAll", query = "SELECT i FROM Item i")})
public class Item implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @Column(name = "id")
    private Long id;
    @Column(name = "string_id")
    private String stringId;
    @Basic(optional = false)
    @Column(name = "category_id")
    private long categoryId;
    @Basic(optional = false)
    @Column(name = "title")
    private String title;
    @Basic(optional = false)
    @Lob
    @Column(name = "description")
    private String description;
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
    @Basic(optional = false)
    @Column(name = "colors")
    private short colors;

    public Item() {
    }

    public Item(Long id) {
        this.id = id;
    }

    public Item(Long id, long categoryId, String title, String description, boolean inNew, String inPromotion, short number, long createdTime, long deletedTime, short colors) {
        this.id = id;
        this.categoryId = categoryId;
        this.title = title;
        this.description = description;
        this.inNew = inNew;
        this.inPromotion = inPromotion;
        this.number = number;
        this.createdTime = createdTime;
        this.deletedTime = deletedTime;
        this.colors = colors;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStringId() {
        return stringId;
    }

    public void setStringId(String stringId) {
        this.stringId = stringId;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public short getColors() {
        return colors;
    }

    public void setColors(short colors) {
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
        return "org.fullhappy.entity.Item[ id=" + id + " ]";
    }
    
}
