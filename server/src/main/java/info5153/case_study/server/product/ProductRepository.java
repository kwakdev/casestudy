package info5153.case_study.server.product;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List; 
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "products", path = "products")
public interface ProductRepository extends CrudRepository<Product, String> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Product p WHERE p.id = ?1")
    int deleteOne(String id);
    List<Product> findByVendorId(long vendorId);

}
