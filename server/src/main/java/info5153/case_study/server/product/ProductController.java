package info5153.case_study.server.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; 

@CrossOrigin
@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/api/products")
    public ResponseEntity<Iterable<Product>> findAll() {
        Iterable<Product> products = productRepository.findAll();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PutMapping("/api/products")
    public ResponseEntity<Product> updateOne(@RequestBody Product product) {
        Product updatedProduct = productRepository.save(product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @PostMapping("/api/products")
    public ResponseEntity<Product> createOne(@RequestBody Product product) {
        Product newProduct = productRepository.save(product);
        return new ResponseEntity<>(newProduct, HttpStatus.OK);
    }

    @DeleteMapping("/api/products/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable String id) {
        int deletedCount = productRepository.deleteOne(id);
        return new ResponseEntity<>(deletedCount, HttpStatus.OK);
    }
    @GetMapping("/api/products/{vendorId}")
    public ResponseEntity<Iterable<Product>> findByVendorId(@PathVariable long vendorId) {
        Iterable<Product> products = productRepository.findByVendorId(vendorId);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
