package net.mzouabi.ng2.server.mapper;


import net.mzouabi.ng2.server.dto.UserDTO;
import net.mzouabi.ng2.server.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.TargetType;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    public UserDTO toDTO(User user);

    public User toEntity(UserDTO user);

    public void mapToEntity(UserDTO userDTO, @MappingTarget User user);
	
}
