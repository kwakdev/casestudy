package info5153.case_study.server.product;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.math.BigDecimal;

@Entity
@Data
public class Product {
    @Id
    private String ID;
    private long vendorId;
    private String name;
    private BigDecimal cost;
    private BigDecimal msrp;
    private int rop;
    private int eoq;
    private int qoh;
    private int qoo;
}