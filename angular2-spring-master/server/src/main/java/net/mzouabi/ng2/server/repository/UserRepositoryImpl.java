package net.mzouabi.ng2.server.repository;

import com.mysema.query.jpa.JPQLQuery;
import com.mysema.query.jpa.impl.JPAQuery;

import net.mzouabi.ng2.server.model.User;
import net.mzouabi.ng2.server.model.QUser;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class UserRepositoryImpl implements UserRepositoryCustom{
	@PersistenceContext
	private EntityManager em;
	@Override
	public int countCustom() {
		JPQLQuery query = new JPAQuery(em);
		return (int) query.from(QUser.user).where(QUser.user.id.isNotNull()).count();
	}
	
}
