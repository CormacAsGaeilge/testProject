package net.mzouabi.ng2.server.service;

import net.mzouabi.ng2.server.dto.UserDTO;
import net.mzouabi.ng2.server.mapper.UserMapper;
import net.mzouabi.ng2.server.model.User;
import net.mzouabi.ng2.server.repository.UserRepository;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class UserServiceImpl implements UserService{
	final static Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    UserRepository userRepository;


    UserMapper userMapper;

    @Override
    public Page<UserDTO> findUsers(Pageable pageable) {
        return userRepository.findAll(pageable).map(user -> userMapper.toDTO(user));
    }

    @Override
    public UserDTO getUser(Long id) {
        User user = userRepository.getOne(id);
        if (user == null) {
            return null;
        } else {
            return userMapper.toDTO(user);
        }
    }
    
    @Override
    public UserDTO findByUsername(String username)
    {
        List<User> users = userRepository.findByUsername(username);
        User user = users.get(0);
        if (user == null) {
            return null;
        } else {
            return userMapper.toDTO(user);
        }
    }

    @Override
    public void updateUser(UserDTO userDTO) {
        User user = userRepository.findOne(userDTO.getId());
        userMapper.mapToEntity(userDTO, user);
    }

    @Override
    public void save(User user) {
        //User user = userMapper.toEntity(userDTO);
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.delete(id);
    }
}
