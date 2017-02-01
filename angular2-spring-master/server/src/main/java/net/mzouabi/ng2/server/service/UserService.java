package net.mzouabi.ng2.server.service;

import net.mzouabi.ng2.server.dto.UserDTO;
import net.mzouabi.ng2.server.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface UserService {
	
    Page<UserDTO> findUsers(Pageable pageable);

    UserDTO getUser(Long id);
    
    UserDTO findByUsername(String username);
    
    void updateUser(UserDTO userDTO);

    void save(User user);

    void deleteUser(Long id);
}
