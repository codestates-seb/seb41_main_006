package com.mainproject.server.domain.address.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mainproject.server.domain.address.Entity.NumberAddress;
import com.mainproject.server.domain.address.Entity.NumberAddressId;

public interface NumberAddressRepository extends JpaRepository<NumberAddress, NumberAddressId> {
}
