package info5153.case_study.server.po;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.time.LocalDateTime;

@Component
public class PurchaseOrderDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public PurchaseOrder create(PurchaseOrder purchaseOrder) {

        purchaseOrder.setDate(LocalDateTime.now());
        entityManager.persist(purchaseOrder); // Needed to generate PurchaseOrder ID

        for (PurchaseOrderLineItem item : purchaseOrder.getItems()) {
            item.setPoId(purchaseOrder.getID());
            entityManager.persist(item);
        }

        entityManager.flush();
        entityManager.refresh(purchaseOrder);
        return purchaseOrder;
    }
}