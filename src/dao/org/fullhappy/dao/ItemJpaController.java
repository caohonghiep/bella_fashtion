/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.fullhappy.dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.fullhappy.dao.exceptions.NonexistentEntityException;
import org.fullhappy.dao.exceptions.PreexistingEntityException;
import org.fullhappy.entities.Item;

/**
 *
 * @author AAAA
 */
public class ItemJpaController extends JpaController {

    public void create(Item item) throws PreexistingEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            em.persist(item);
            em.getTransaction().commit();
        } catch (Exception ex) {
            if (findItem(item.getId()) != null) {
                throw new PreexistingEntityException("Item " + item + " already exists.", ex);
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(Item item) throws NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            item = em.merge(item);
            em.getTransaction().commit();
        } catch (Exception ex) {
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                Long id = item.getId();
                if (findItem(id) == null) {
                    throw new NonexistentEntityException("The item with id " + id + " no longer exists.");
                }
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void destroy(Long id) throws NonexistentEntityException {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Item item;
            try {
                item = em.getReference(Item.class, id);
                item.getId();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The item with id " + id + " no longer exists.", enfe);
            }
            em.remove(item);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<Item> findItemEntities() {
        return findItemEntities(true, -1, -1);
    }

    public List<Item> findItemEntities(int maxResults, int firstResult) {
        return findItemEntities(false, maxResults, firstResult);
    }

    private List<Item> findItemEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Item.class));
            Query q = em.createQuery(cq);
            if (!all) {
                q.setMaxResults(maxResults);
                q.setFirstResult(firstResult);
            }
            return q.getResultList();
        } finally {
            em.close();
        }
    }

    public List<Item> findByCategoryId(long categoryId) {
        EntityManager entityManager = getEntityManager();
        List<Item> list1 = null;
        try {
            List<Item> list = entityManager.createQuery(
                    " SELECT e FROM " + Item.class.getSimpleName() + " e WHERE e.categoryId = " + categoryId)
                    .getResultList();
            list1 = list.subList(0, list.size());
        } catch (Exception e) {
            //Logger.getLogger("findByCategoryId" + e.getMessage());
        } finally {
            entityManager.close();
        }
        return list1;
    }

    public List<Item> findByCategoryId(Long categoryId, int startPosition, int maxResult) {
        EntityManager entityManager = getEntityManager();
        String query = " SELECT e FROM " + Item.class.getSimpleName();
        if (categoryId > 0) {
            query += " e WHERE e.categoryId = " + categoryId;
        }else{
            query += " e WHERE 1 = 1" ;
        }
        query+=" AND e.deletedTime = 0";
        try {
            List<Item> list = entityManager.createQuery(query)
                    .setFirstResult(startPosition)
                    .setMaxResults(maxResult)
                    .getResultList();
            return list;
        } catch (Exception e) {
            Logger.getLogger("findByCategoryId" + e.getMessage());
        } finally {
            entityManager.close();
        }
        return new ArrayList<>(0);
    }

    public Item findItem(Long id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Item.class, id);
        } finally {
            em.close();
        }
    }

    public int getItemCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Item> rt = cq.from(Item.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
//    public static void main(String []ag){
//        (new ItemJpaController()).findByCategoryId(6L);
//    }

    public List<Item> findByInNew(int startPosition, int maxResult) {
        EntityManager entityManager = getEntityManager();
        try {
            List<Item> list = entityManager.createQuery(
                    " SELECT e FROM " + Item.class.getSimpleName()
                    + " e WHERE e.inNew = " + true)
                    .setFirstResult(startPosition).setMaxResults(maxResult)
                    .getResultList();
            return list;
        } catch (Exception e) {
            Logger.getLogger("findByInNew" + e.getMessage());
        } finally {
            entityManager.close();
        }
        return new ArrayList<>();
    }

    public List<Item> findByInPromotion(int startPosition, int maxResult) {
        EntityManager entityManager = getEntityManager();
        try {
            List<Item> list = entityManager.createQuery(
                    " SELECT e FROM " + Item.class.getSimpleName()
                    + " e WHERE e.inPromotion <> '' ")
                    .setFirstResult(startPosition).setMaxResults(maxResult)
                    .getResultList();
            return list;
        } catch (Exception e) {
            Logger.getLogger("findByInNew" + e.getMessage());
        } finally {
            entityManager.close();
        }
        return new ArrayList<>();
    }

}
