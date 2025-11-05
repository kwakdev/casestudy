package info5153.case_study.server.Vendor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin

@RestController
public class VendorController {
     @Autowired
    private VendorRepository vendorRepository;

    @GetMapping("/api/vendors")
    public ResponseEntity<Iterable<Vendor>> findAll() {
        Iterable<Vendor> vendors = vendorRepository.findAll();
        return
         new ResponseEntity<Iterable<Vendor>>(vendors, HttpStatus.OK);
    }
     @PutMapping("/api/vendors")
    public ResponseEntity<Vendor> updateOne(@RequestBody Vendor vendor) {
        Vendor updatedVendor= vendorRepository.save(vendor);
        return new ResponseEntity<Vendor>(updatedVendor, HttpStatus.OK);
    }
    @DeleteMapping("/api/vendors/{id}")
public ResponseEntity<Integer> deleteOne(@PathVariable long id) {
    int deletedCount = vendorRepository.deleteOne(id);
    return new ResponseEntity<>(deletedCount, HttpStatus.OK);
}
@PostMapping("/api/vendors")
public ResponseEntity<Vendor> createOne(@RequestBody Vendor vendor) {
    Vendor newVendor = vendorRepository.save(vendor);
    return new ResponseEntity<>(newVendor, HttpStatus.OK);
}


}
