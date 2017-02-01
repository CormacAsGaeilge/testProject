package net.mzouabi.ng2.server.repository;
import net.mzouabi.ng2.server.model.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

		List<User> findByUsername(String username);

}
